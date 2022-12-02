function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function handleRequest(request, setAlert, type) {
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        setAlert({
          severity: "success",
          message: capitalize(type)+" added successfully!",
        });
      } else {
        setAlert({ severity: "error", message: "Error adding "+type+"!" });
        console.log(res);
      }
    })
    .catch((error) => {
      setAlert({ severity: "error", message: "Server Error!" });
      console.log(error);
    });
}
async function handleAuthContext(setIsLoading, setError, dispatch, response, authType) {
    const json = await response.json()
    if (!response.ok){
        setIsLoading(false)
        setError(json.error)
    }
    else{
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json))

        //update auth context
        dispatch({type: authType, payload: json})
        setIsLoading(false)
    }
}

module.exports = { handleRequest, handleAuthContext };