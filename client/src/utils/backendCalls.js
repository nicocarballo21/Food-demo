


export const getDiets = async () => {
    const diets = await axios.get('/diets');
    return diets.data;
}

