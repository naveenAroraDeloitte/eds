function createInnerComponets(container, cdpJSON) {
    // top Container
  const topContainer = document.createElement('div');
  topContainer.classList.add('top-container');

  // Personal Details
  const personalDetails = document.createElement('div');
  personalDetails.classList.add('personalDetails');
  const personalDetailsHeading = document.createElement('h2');
  personalDetailsHeading.innerText = 'Personal Details';
  personalDetails.append(personalDetailsHeading);

 //  const h6 = document.createElement('h6');
 //  h6.innerText = 'ECID';
 //  const p = document.createElement('p');
 //  p.innerText = cdpJSON.profile.identityMap.ecid[0].id;
 //   identities.append(h6);
 //  identities.append(p);
  topContainer.append(personalDetails);

  // segments
  const segments = document.createElement('div');
  segments.classList.add('segments');
  const segmentsHeading = document.createElement('h2');
  segmentsHeading.innerText = 'Segments';
  segments.append(segmentsHeading);
  const ul = document.createElement('ul');
  let li;
  cdpJSON.profile.segmentMembership.forEach((element) => {
    li = document.createElement('li');
    li.append(element);
    console.log(element);
    ul.append(li);
  });
  segments.append(ul);
  topContainer.append(segments);

  // Identities
  const identities = document.createElement('div');
  identities.classList.add('identities');
  const identitiesHeading = document.createElement('h2');
  identitiesHeading.innerText = 'Identities';
  identities.append(identitiesHeading);

  const h6 = document.createElement('h6');
  h6.innerText = 'ECID';
  const p = document.createElement('p');
  p.innerText = cdpJSON.profile.identityMap.ecid[0].id;

  identities.append(h6);
  identities.append(p);
  topContainer.append(identities);

  
   container.append(topContainer);

  // bottom container
  const bottomContainer = document.createElement('div');
  bottomContainer.classList.add('bottom-container');
  const eventsContainer = document.createElement('div');
  eventsContainer.classList.add('events');
  const eventsHeading = document.createElement('h2');
  eventsHeading.innerText = 'Events';
  eventsContainer.append(eventsHeading);

  const table = document.createElement('table');
  const trHead = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.innerText = 'Timestamp';
  const th2 = document.createElement('th');
  th2.innerText = 'Event';
  const th3 = document.createElement('th');
  th3.innerText = 'Notes';
  trHead.append(th1);
  trHead.append(th2);
  trHead.append(th3);
  table.append(trHead);

  cdpJSON.events.forEach((element) => {
    const trBody = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = element.entity.timestamp;
    const td2 = document.createElement('td');
    td2.innerText = element.entity.eventType;
    const td3 = document.createElement('td');
    td3.innerText = JSON.stringify(element.entity.web);
    trBody.append(td1);
    trBody.append(td2);
    trBody.append(td3);
    table.append(trBody);
  });
  eventsContainer.append(table);
  bottomContainer.append(eventsContainer);
  container.append(bottomContainer);
}

async function createCdpComponets() {
  let dataSource = './aep_data.json';

  const fetchCdpsData = await fetch(dataSource);
  const cdpJSON = await fetchCdpsData.json();

  console.log(cdpJSON, 'CDP DATA');

  const container = document.createElement('div');
  createInnerComponets(container, cdpJSON);

  return container;
}

/**
 * loads and decorates the cdpData
 * @param {Element} block The cdpData block element
 */
export default async function decorate(block) {
  const cdpBlock = block.querySelector('a');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('cdp-data');
  if (cdpBlock) {
    parentDiv.append(await createCdpComponets());
    cdpBlock.replaceWith(parentDiv);
  }
}
