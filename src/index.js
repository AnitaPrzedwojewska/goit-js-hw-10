import axios from 'axios';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] = 'твой ключ';



new SlimSelect({
  select: '#selectElement',
})
