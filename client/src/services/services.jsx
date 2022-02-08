
export const keys = (Yaxis) => Object.keys(Yaxis).flat(2)

export const values = (Xaxis) => Object.values(Xaxis).flat(2)

export const arrangeData = (data) => {
    let rows = data.split(' ').map(row => {
        let cell = row.split('	')
        return cell;
    })
    return rows
}

export const displayRandomColorBars = (chartTypeLine, props) => {
    if (chartTypeLine) {
        let x = Math.floor(Math.random() * 256);
        let y = 100 + Math.floor(Math.random() * 256);
        let z = 50 + Math.floor(Math.random() * 256);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        return bgColor
    }
    if (Object.keys(props.sendData)[0]) {
        return Object.values(props.sendData)[0].map((bar, index) => {
            let x = Math.floor(Math.random() * 256);
            let y = 100 + Math.floor(Math.random() * 256);
            let z = 50 + Math.floor(Math.random() * 256);
            let bgColor = "rgb(" + x + "," + y + "," + z + ")";
            return bgColor
        })
    }
}