import React, { useState } from 'react';
import './App.css';
import { BARON, DEMON, DRUNK, MINIONS, OUTSIDERS, role, TOWN_FOLKS } from './images';

interface player {
  name: string;
  imgSrc: string;
  imgAlt: string;
}

function App() {

  const [data, setData] = useState({
    names: "candy suz jim ivy charlie vivian baiyi ka gary",
    townsfolkCount: 5,
    outsiderCount: 2,
    minionCount: 1,
  })

  const [players, setPlayers] = useState<player[]>([]);
  const [drunkRole, setDrunkRole] = useState<role>(DRUNK);
  const [demonRoles, setDemonRoles] = useState<role[]>([]);

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
    const minions = randomGetCharacters(data.minionCount, [...MINIONS]);

    let townsfolkCountsUpdated = data.townsfolkCount;
    let outsiderCountsUpdated = data.outsiderCount;
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

  return (
    <div className="App">

      <label>Enter names of the players, split by " " space</label>
      <br />
      <input
        style={{ width: '80%' }}
        type="text"
        id="names"
        name="names"
        onChange={handleChange}
      // value={names}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignContent: 'flex-start',
        alignItems: 'center'
      }}>
        <br />
        <label>Number of townsfolks:</label>
        <input type="number" name="townsfolkCount" onChange={handleChange} />
        <br />
        <label>Number of outsiders:</label>
        <input type="number" name="outsiderCount" onChange={handleChange} />
        <br />
        <label>Number of minions:</label>
        <input type="number" name="minionCount" onChange={handleChange} />
        <br />
        <br />
      </div>
      <button style={{ width: '96px', height: '24px' }} onClick={calculate}>Generate</button>
      <h2>Number of players: {players.length}</h2>
      <div style={{marginLeft: '1%'}}>
        {players.map((player, index) => (
          <>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
            <div style={{fontSize: 24, fontWeight: 'bold'}}>{player.name}</div>
            <div>
              <img src={player.imgSrc} alt={player.imgAlt} width='112' />
              {player.imgAlt === DRUNK.alt && <img src={drunkRole.src} alt={drunkRole.alt} width='112' />}
              {player.imgAlt === DEMON.alt && demonRoles.map((role, index) => <img src={role.src} alt={role.alt} width='112' />)}
            </div>
          </div>
          <div style={{marginLeft: '-2%',  borderBottom: 'solid' }}></div>
          </>
          ))}
      </div>
    </div>
  );
}

export default App;
