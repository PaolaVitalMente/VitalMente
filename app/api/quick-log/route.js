import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { userId, date, field, increment } = await request.json();
    
    if (!userId || !date || !field || increment === undefined) {
      return Response.json(
        { error: 'Missing required fields: userId, date, field, increment' },
        { status: 400 }
      );
    }

    const validFields = ['water', 'exercise', 'mindfulness', 'desayuno', 'almuerzo', 'cena'];
    if (!validFields.includes(field)) {
      return Response.json(
        { error: `Invalid field. Must be one of: ${validFields.join(', ')}` },
        { status: 400 }
      );
    }

    const { data: currentProgress, error: fetchError } = await supabase
      .from('daily_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    let updatedData;
    
    if (currentProgress) {
      const currentValue = currentProgress[field] || 0;
      const newValue = currentValue + increment;
      
      updatedData = {
        [field]: newValue,
        updated_at: new Date().toISOString()
      };

      const { data, error: updateError } = await supabase
        .from('daily_progress')
        .update(updatedData)
        .eq('user_id', userId)
        .eq('date', date)
        .select()
        .single();

      if (updateError) throw updateError;
      updatedData = data;
      
    } else {
      updatedData = {
        user_id: userId,
        date: date,
        water: field === 'water' ? increment : 0,
        exercise: field === 'exercise' ? increment : 0,
        mindfulness: field === 'mindfulness' ? increment : 0,
        desayuno: field === 'desayuno' ? increment : 0,
        almuerzo: field === 'almuerzo' ? increment : 0,
        cena: field === 'cena' ? increment : 0,
        updated_at: new Date().toISOString()
      };

      const { data, error: insertError } = await supabase
        .from('daily_progress')
        .insert(updatedData)
        .select()
        .single();

      if (insertError) throw insertError;
      updatedData = data;
    }

    return Response.json({
      success: true,
      message: `${field} updated successfully`,
      data: updatedData,
      newValue: updatedData[field]
    });

  } catch (error) {
    return Response.json(
      { error: 'Failed to update progress', details: error.message },
      { status: 500 }
    );
  }
}
