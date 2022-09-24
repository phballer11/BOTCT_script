import React, { useEffect } from 'react'
import { ALL_ROLES, role } from './images'

export default function SelectRoles() {
    const [selectedRoles, setSelectedRoles] = React.useState<role[]>([])

    useEffect(() => {
        const roles = localStorage.getItem('selectedRoles');
        setSelectedRoles(JSON.parse(roles || '[]'));
    }, []);

    const imgDimension = "96px";

    const getBorderColor = (alt: string) => {
        if (selectedRoles.findIndex(r => r.alt === alt) !== -1) {
            return "blue";
        }

        return "grey"
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
                {ALL_ROLES.map((role: role) => (
                    <div style={{ display: "flex", border: "solid", margin: "8px", borderColor: getBorderColor(role.alt) }}
                        onClick={() => roleSelected(role.alt)}>
                        <img src={role.src} alt={role.alt} width={imgDimension} height={imgDimension} />
                    </div>))}
            </div>
        </>
    )
}
