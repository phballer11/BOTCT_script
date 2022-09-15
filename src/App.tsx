import React, { useState } from 'react';
import './App.css';
import { BARON, DEMON, DRUNK, MINIONS, OUTSIDERS, role, TOWN_FOLKS } from './images';
import { getRoles } from './numberOfRoles';

interface player {
  name: string;
  imgSrc: string;
  imgAlt: string;
}

function App() {

  const [data, setData] = useState({
    names: "",
    townsfolkCount: 0,
    outsiderCount: 0,
    minionCount: 0,
  })

  const [players, setPlayers] = useState<player[]>([]);
  const [drunkRole, setDrunkRole] = useState<role>(DRUNK);
  const [demonRoles, setDemonRoles] = useState<role[]>([]);
  const [unusedTownsfolks, setUnusedTownsfolks] = useState<role[]>([]);
  const [unusedOutsiders, setUnusedOutsiders] = useState<role[]>([]);

  const handleChange = (event: any) => {
    setData(prev => ({ ...prev, [event.target.name]: event.target.value }));

  };

  const reset = () => {
    setPlayers([]);
    setDemonRoles([]);
    setDrunkRole(DRUNK);
  }

  const calculate = () => {
    reset();


    const namesArray = data.names.split(' ');
    const filteredNames = namesArray.filter((name) => name !== '');

    if (filteredNames.length < 5 || filteredNames.length > 15) {
      alert('Please check the number of players');
      return;
    }

    const numberOfRoles = getRoles(filteredNames.length);
    setData(prev => ({ ...prev, townsfolkCount: numberOfRoles.townsfolkCounts, outsiderCount: numberOfRoles.outsiderCounts, minionCount: numberOfRoles.minionCounts }));

    const minions = randomGetCharacters(numberOfRoles.minionCounts, [...MINIONS]);

    let townsfolkCountsUpdated = numberOfRoles.townsfolkCounts;
    let outsiderCountsUpdated = numberOfRoles.outsiderCounts;
    if (minions.findIndex(m => m.alt === BARON.alt) !== -1) {
      townsfolkCountsUpdated = +townsfolkCountsUpdated - 2;
      outsiderCountsUpdated = +outsiderCountsUpdated + 2;
    }

    const townsfolk = randomGetCharacters(townsfolkCountsUpdated, [...TOWN_FOLKS]);
    const outsiders = randomGetCharacters(outsiderCountsUpdated, [...OUTSIDERS]);


    const unusuedTownsFolk = TOWN_FOLKS.filter((townFolk) => townsfolk.indexOf(townFolk) === -1);
    const unusuedOutsiders = OUTSIDERS.filter((outsider) => outsiders.indexOf(outsider) === -1);

    const allRoles = [townsfolk, outsiders, minions, DEMON].flat();

    if (filteredNames.length !== allRoles.length) {
      alert('Please check the number of players and roles');
      return;
    }

    let result: player[] = [];
    filteredNames.forEach(name => {
      // random pick a role
      const randomIndex = Math.floor(Math.random() * allRoles.length);
      const randomRole = allRoles[randomIndex];
      if (randomRole.alt === DRUNK.alt) {
        addDrunk(unusuedTownsFolk);
      }

      allRoles.splice(randomIndex, 1);
      result.push({ name, imgSrc: randomRole.src, imgAlt: randomRole.alt });
    });
    addDemonRoles([unusuedOutsiders, unusuedTownsFolk].flat());
    setPlayers(result);
    setUnusedOutsiders(unusuedOutsiders);
    setUnusedTownsfolks(unusuedTownsFolk);
  }

  const addDrunk = (unusuedTownsFolk: role[]) => {
    const randomIndex = Math.floor(Math.random() * unusuedTownsFolk.length);
    const randomRole = unusuedTownsFolk[randomIndex];
    unusuedTownsFolk.splice(randomIndex, 1);
    setDrunkRole(randomRole);
  }

  const addDemonRoles = (unusedRoles: role[]) => {
    for (var i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * unusedRoles.length);
      const randomRole = unusedRoles[randomIndex];
      unusedRoles.splice(randomIndex, 1);
      setDemonRoles(prev => [...prev, randomRole]);
    }

  }

  const randomGetCharacters = (numberOfRoles: number, roles: role[]) => {
    const results = [];
    for (let i = 0; i < numberOfRoles; i++) {
      const randomIndex = Math.floor(Math.random() * roles.length);
      results.push(roles[randomIndex]);
      roles.splice(randomIndex, 1);
    }
    return results;
  }
  const imgClicked = (alt: string) => {
    console.log('img clicked', alt);
    const ele = document.getElementById(alt);
    console.log(ele);
    const res = prompt("Enter the role to override:");
    console.log(res);
    if (!res) {
      return;
    }

    let overrideRole = unusedTownsfolks.find(role => role.alt.toLowerCase() === res?.toLowerCase());
    if (!overrideRole) {
      overrideRole = unusedOutsiders.find(role => role.alt.toLowerCase() === res?.toLowerCase());
    }
    if (!overrideRole) {
      alert('Please check the role name');
      return;
    }

    ele?.setAttribute('alt', overrideRole.alt);
    ele?.setAttribute('src', overrideRole.src);

  }

  return (
    <div className="App">

      <label>Enter the names of the players, split by " " space. Support 5-15 players.</label>
      <br />
      <input
        style={{ width: '80%' }}
        type="text"
        id="names"
        name="names"
        onChange={handleChange}
      />
      <br />
      <br />

      <button style={{ width: '96px', height: '24px' }} onClick={calculate}>Generate</button>
      <h2 style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        marginBottom: 0
      }}>Number of players: {players.length}
        {players.length > 0 && <>
          <div style={{ color: 'green' }}>Townsfolks: {data.townsfolkCount} Outsiders: {data.outsiderCount}</div>
          <div style={{ color: 'red' }}>Minions: {data.minionCount} Demon: 1</div>
        </>}</h2>
      {players.length > 0 && <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0
      }}><h4 style={{margin: 0}}>Unused townfolks:</h4> {unusedTownsfolks.map(r => r.alt).join(',')}</div>}
      {players.length > 0 && <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0
      }}><h4 style={{margin: 0}}>Unused outsiders:</h4> {unusedOutsiders.map(r => r.alt).join(',')}</div>}
      <div style={{ marginLeft: '1%' }}>
        {players.map((player, index) => (
          <>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold' }}>{player.name}</div>
              <div>
                <img id={player.imgAlt} onClick={(e) => imgClicked(player.imgAlt)} src={player.imgSrc} alt={player.imgAlt} width='112' />
                {player.imgAlt === DRUNK.alt && <div >
                  <img id={drunkRole.alt} onClick={(e) => imgClicked(drunkRole.alt)} src={drunkRole.src} alt={drunkRole.alt} width='112' />
                </div>}
                {player.imgAlt === DEMON.alt && demonRoles.map((role, index) => <img id={role.alt} onClick={(e) => imgClicked(role.alt)} src={role.src} alt={role.alt} width='112' />)}
              </div>
            </div>
            <div style={{ marginLeft: '-2%', borderBottom: 'solid' }}></div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
