const fetchData = async () => {
    const response = await fetch('/api/my-data');
    const data = await response.json();
    return data;
};
