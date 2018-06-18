const handleError = (res, e, status) => {
    res.status(status).send(e)
}

module.exports = {handleError}