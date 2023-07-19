import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useParams} from "react-router-dom";
import CustomSearchable from "../CustomSearchable";
import NewIndustry from "../Industries/NewIndustry";

const NewCompany = () => {
    const {id} = useParams()
    const {handleSubmit, register, reset} = useForm();
    const [industries, setIndustries] = useState([]);

    const [companyName, setCompanyName] = useState("")
    const [website, setWebsite] = useState("")
    const [rep, setRep] = useState("")
    const [industryId, setIndustryId] = useState(null)
    const [post, setPost] = useState('')
    const [salutation, setSalutation] = useState('')
    const [mobile, setMobile] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [employees, setEmployees] = useState(0) 
    const [experience, setExperience] = useState('')
    const [comments, setComments] = useState('')
    const [registroMercantil, setRegistroMercantil] = useState('')
    const [identificacionNacional, setIdentificacionNacional] = useState('')
    const [country, setCountry] = useState("Iran")
    const [city, setCity] = useState("Tehran")
    const [research, setResearch] = useState("")
    const [stage, setStage] = useState("")
    const [rating, setRating] = useState(0)
    const [type, setType] = useState("")
    useEffect(() => {
        fetchIndustries();
        if (id) {
            fetchCompany()
        }
    }, []);

    const fetchCompany = async () => {
        try {
            const response = await axios.get(`/api/Companies/${id}`);
            setCompanyName(response.data.name)
            setWebsite(response.data.website)
            setRep(response.data.representative)
            setPost(response.data.pusto)
            setSalutation(response.data.salutation)
            setMobile(response.data.mobile)
            setPhone(response.data.phone)
            setEmail(response.data.email)
            setAddress(response.data.address)
            setEmployees(response.data.employees)
            setExperience(response.data.experience)
            setComments(response.data.comments)
            setRegistroMercantil(response.data.registroMercantil)
            setIdentificacionNacional(response.data.identificacionNacional)
            setCountry(response.data.country)
            setCity(response.data.city)
            setResearch(response.data.research)
            setStage(response.data.stage)
            setRating(response.data.rating)
            setType(response.data.type)
            setIndustryId(response.data.industry.id)
        } catch (error) {
            console.error(error);
        }
    }
    const fetchIndustries = async () => {
        try {
            const response = await axios.get('/api/Industries');
            setIndustries(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onEdit = async () => {
        if(id) {
            try {
                const res = axios.put(`/api/Companies/${id}`, {
                    id: id,
                    name: companyName,
                    industryId: industryId,
                    contactName: rep,
                    salutation: salutation,
                    pusto: post,
                    mobile: mobile,
                    phone: phone,
                    email: email,
                    webPage: website,
                    address: address,
                    comments: comments,
                    employees: employees,
                    experience: experience,
                    registroMercantil: registroMercantil,
                    identificacionNacional: identificacionNacional,
                    country: country,
                    city: city,
                    stage: stage,
                    type: type,
                    rating: rating,
                    research: research
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const res = axios.post(`/api/Companies`, {
                    name: companyName, 
                    industryId: industryId,
                    contactName: rep, 
                    salutation: salutation,
                    pusto: post,
                    mobile: mobile,
                    phone: phone,
                    email: email,
                    webPage: website,
                    address: address,
                    comments: comments,
                    employees: employees,
                    experience: experience,
                    registroMercantil: registroMercantil,
                    identificacionNacional: identificacionNacional,
                    country: country,
                    city: city,
                    stage: stage,
                    type: type,
                    rating: rating,
                    research: research
                })
            } catch (err) {}
        }
    }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" component="h2">
                    Add Company
                </Typography>
            </Grid>
            <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onEdit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <CustomSearchable
                                        title={'Industry'}
                                        data={industries} clickFn={setIndustryId} value={industryId}>
                                        <NewIndustry/>
                                    </CustomSearchable>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    value={companyName}
                                    onChange={e => setCompanyName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Type of Company"
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Website"
                                    value={website}
                                    onChange={e => setWebsite(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Name"
                                    value={rep}
                                    onChange={e => setRep(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Name"
                                    value={rep}
                                    onChange={e => setRep(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Pusto"
                                    value={post}
                                    onChange={e => setPost(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Salutation"
                                    value={salutation}
                                    onChange={e => setSalutation(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Mobile"
                                    value={mobile}
                                    onChange={e => setMobile(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Employees"
                                    type={'number'}
                                    value={employees}
                                    onChange={e => setEmployees(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Rating"
                                    type={'number'}
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Registro Mercantil"
                                    value={registroMercantil}
                                    onChange={e => setRegistroMercantil(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Identificacion Nacional"
                                    value={identificacionNacional}
                                    onChange={e => setIdentificacionNacional(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    value={address}
                                    multiline
                                    rows={4}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Comments"
                                    value={comments}
                                    onChange={e => setComments(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Research"
                                    value={research}
                                    onChange={e => setResearch(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
             
            </Grid>
        </Grid>
    );
};

export default NewCompany;
