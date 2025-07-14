function createWeatherUI(weatherBlock, weatherData) {
  // weatherBlock.innerHTML += `<div class="data">
  // ${weatherData.location.name} ${weatherData.current.temp_c}<sup>o</sup> C
  //     </div>`;
}

async function createWeatherBlock(apiURL) {
  const fetchWeatherData = await fetch(apiURL);
  const weatherData = await fetchWeatherData.json();
  const weatherBlock = document.createElement('div');
  createWeatherUI(weatherBlock, weatherData);
  return weatherBlock;
}

/**
 * loads and decorates the weather block
 * @param {Element} block The weather block element
 */
export default async function decorate(block) {
  const weatherElm = block.querySelector('a');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('weather-container');
  if (weatherElm) {
    parentDiv.append(await createWeatherBlock(weatherElm.href));
    weatherElm.replaceWith(parentDiv);
  }
}
