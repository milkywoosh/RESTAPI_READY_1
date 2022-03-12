
export const simpleDoing = (req, res) => {
    console.log('doing a very simple thing')
    res.json({mesagge: {
        status: 200,
        data : "currently success connected to server",
    }})
}