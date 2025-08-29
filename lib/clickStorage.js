const supabase = require('./supabaseClient');

module.exports = {
  async getClicks() {
    const { data, error } = await supabase
      .from('clicks')
      .select('count')
      .eq('id', 'global')
      .single();
    if (error) throw error;
    return data.count;
  },

  async incrementClicks() {
    const { data, error } = await supabase
      .rpc('increment_clicks', { click_id: 'global' });
    if (error) throw error;
    return data;
  }
};