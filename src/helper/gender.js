export const spesifyGender = (data) => {
    switch (data.gender) {
        case 'perempuan' :
            return 'Bu'
            break;
        case 'laki-laki':
            return 'Pak'
            break;
        default :
            return 'Halo'
            break;
    }
}
