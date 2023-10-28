
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }
  

module.exports = {
    getPostData,
    emptyOrRows
}
