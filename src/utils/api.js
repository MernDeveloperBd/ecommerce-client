
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData) =>{
    try {
        const response = await fetch(apiUrl + URL, {
            method:'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formData)
        })
         const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        
    }
}