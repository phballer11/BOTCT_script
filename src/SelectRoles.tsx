import React, { useEffect } from 'react'
import { ALL_ROLES, DEMON, MINIONS, OUTSIDERS, role, TOWN_FOLKS } from './images'
import { isDemon, isMinion } from './rolesHelper';

export default function SelectRoles() {
    const [selectedRoles, setSelectedRoles] = React.useState<role[]>([])
    const [drunkRole, setDrunkRole] = React.useState<role | undefined>();
    const [demonBluffs, setDemonBluffs] = React.useState<role[]>([]);
    const [selectMode, setSelectMode] = React.useState("0"); // 0: select roles, 1: select drunk role, 2: select demon bluffs 

    useEffect(() => {
        const roles = localStorage.getItem('selectedRoles');
        setSelectedRoles(JSON.parse(roles || '[]'));

        const drunkRoleFromStorage = localStorage.getItem('drunkRole');
        setDrunkRole(JSON.parse(drunkRoleFromStorage || 'null'));

        const demonBluffsFromStorage = localStorage.getItem('demonBluffs');
        setDemonBluffs(JSON.parse(demonBluffsFromStorage || '[]'));
    }, []);

    const imgDimension = "96px";

    const getBorderColor = (alt: string) => {
        const selectedRole = selectedRoles.find(r => r.alt === alt);
        if (selectedRole != null) {
            if (isDemon(selectedRole) || isMinion(selectedRole)) {
                return "red";
            }
            return "blue";
        }

        const selectedDrunkRole = drunkRole?.alt === alt;
        if (selectedDrunkRole) {
            return "orange";
        }

        const selectedDemonBluffs = demonBluffs.find(r => r.alt === alt);
        if (selectedDemonBluffs) {
            return "yellow";
        }

        return "grey"
    };

    const getBorderWidth = (alt: string) => {
        if (selectedRoles.findIndex(r => r.alt === alt) !== -1 
        || drunkRole?.alt === alt ||
        demonBluffs.findIndex(r => r.alt === alt) !== -1) {
            return "5px";
        }

        return "1px"
    };

    const roleSelected = (alt: string) => {
        if (selectMode === "0") {
            selectAllRoles(alt);
        }
        else if (selectMode === "1") {
            selectDrunkRole(alt);
        }
        else if (selectMode === "2") {
            selectDemonBluffs(alt);
        }
    }

    const selectAllRoles = (alt: string) => {
        const role = ALL_ROLES.find(r => r.alt === alt);

        const isSelected = selectedRoles.findIndex(r => r.alt === alt) !== -1;
        let updatedRoles = [];
        if (isSelected) {
            updatedRoles = selectedRoles.filter(r => r.alt !== alt);
        } else {
            updatedRoles = [...selectedRoles, role!];
        }
        setSelectedRoles(updatedRoles);
        localStorage.setItem('selectedRoles', JSON.stringify(updatedRoles));
    }

    const selectDrunkRole = (alt: string) => {
        const role = ALL_ROLES.find(r => r.alt === alt);
        setDrunkRole(role);
        localStorage.setItem('drunkRole', JSON.stringify(role));
    }

    const selectDemonBluffs = (alt: string) => {
        const isSelected = selectedRoles.findIndex(r => r.alt === alt) !== -1;
        if (isSelected) {
            return;
        }

        const role = ALL_ROLES.find(r => r.alt === alt);
        if (demonBluffs.length < 3) {
            setDemonBluffs([...demonBluffs, role!]);
            localStorage.setItem('demonBluffs', JSON.stringify([...demonBluffs, role!]));
            return;
        } 
        // remove first item from demonBluffs
        const updatedDemonBluffs = demonBluffs.slice(1);
        setDemonBluffs([...updatedDemonBluffs, role!]);
        localStorage.setItem('demonBluffs', JSON.stringify([...updatedDemonBluffs, role!]));
    }

    const onValueChange = (event: any) => {
        const value = event.target.value;
        setSelectMode(value);
    }

    const reset =()=>{
        localStorage.clear();
        setSelectedRoles([]);
        setDrunkRole(undefined);
        setDemonBluffs([]);
    }

    return (
        <>
            <div>
                <input type="radio" value="0" name="mode" checked={selectMode === "0"} onChange={onValueChange} /> Select roles
                <input type="radio" value="1" name="mode" checked={selectMode === "1"} onChange={onValueChange} /> Select drunk role (up to 1)
                <input type="radio" value="2" name="mode" checked={selectMode === "2"} onChange={onValueChange} /> Select demon bluffs (up to 3)
            </div>
            
      <button onClick={reset}>Reset all</button>
            <br />
            <div>Tap to select roles to be in the game</div>
            <div style={{ color: "orange", fontWeight: "bold" }}>Warning: custome roles does not enforce the correct balance of roles. Please choose carefully.</div>
            <div style={{ display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                <h3>Townsfolks:</h3>
                {TOWN_FOLKS.map((role) => (<div style={{ display: "flex", border: "solid", margin: "8px", borderColor: getBorderColor(role.alt), borderWidth: getBorderWidth(role.alt) }}
                    onClick={() => roleSelected(role.alt)}>
                    <img src={role.src} alt={role.alt} width={imgDimension} height={imgDimension} />
                </div>))}
            </div>
            <div style={{ display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                <h3>Outsiders:</h3>
                {OUTSIDERS.map((role) => (<div style={{ display: "flex", border: "solid", margin: "8px", borderColor: getBorderColor(role.alt), borderWidth: getBorderWidth(role.alt) }}
                    onClick={() => roleSelected(role.alt)}>
                    <img src={role.src} alt={role.alt} width={imgDimension} height={imgDimension} />
                </div>))}
            </div>
            <div style={{ display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                <h3>Minions:</h3>
                {MINIONS.map((role) => (<div style={{ display: "flex", border: "solid", margin: "8px", borderColor: getBorderColor(role.alt), borderWidth: getBorderWidth(role.alt) }}
                    onClick={() => roleSelected(role.alt)}>
                    <img src={role.src} alt={role.alt} width={imgDimension} height={imgDimension} />
                </div>))}
            </div>
            <div style={{ display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                <h3>Demon:</h3>
                <div style={{ display: "flex", border: "solid", margin: "8px", borderColor: getBorderColor(DEMON.alt), borderWidth: getBorderWidth(DEMON.alt) }}
                    onClick={() => roleSelected(DEMON.alt)}>
                    <img src={DEMON.src} alt={DEMON.alt} width={imgDimension} height={imgDimension} />
                </div>
            </div>
        </>
    )
}