import React, { useEffect } from 'react'
import { ALL_ROLES, DEMON, MINIONS, OUTSIDERS, role, TOWN_FOLKS } from './images'
import { isDemon, isMinion } from './rolesHelper';

export default function SelectRoles() {
    const [selectedRoles, setSelectedRoles] = React.useState<role[]>([])

    useEffect(() => {
        const roles = localStorage.getItem('selectedRoles');
        setSelectedRoles(JSON.parse(roles || '[]'));
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

        return "grey"
    };

    const getBorderWidth = (alt: string) => {
        if (selectedRoles.findIndex(r => r.alt === alt) !== -1) {
            return "5px";
        }

        return "1px"
    };

    const roleSelected = (alt: string) => {
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
    return (
        <>
            <div>Tap to select roles to be in the game</div>
            <div>Warning: custome roles does not enforce the correct balance of roles. Please choose carefully.</div>
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