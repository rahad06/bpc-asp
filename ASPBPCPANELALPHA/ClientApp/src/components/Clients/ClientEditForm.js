import React from 'react';
import {Button, FormControl, Grid, TextField} from "@mui/material";
import CustomSearchable from "../CustomSearchable";
import NewIndustry from "../Industries/NewIndustry";
import NewAgenda from "../Agendas/NewAgenda";

function ClientEditForm(props) {
    const {handleSubmit, onEdit, industries, setIndustryId, industryId,clientName,
        setClientName,website, setWebsite,rep, setRep,agendasL,agendas, setAgendas, agenda}=props
    return (
        <div>
        <div className="panel with-scroll animated zoomIn">
            <div className="panel-heading clearfix">
                <h3 className="panel-title">Edit Client</h3></div>
            <div className="panel-body">
                <div
                    className="ng-scope">
                    <form className="ng-pristine ng-valid ng-scope"  onSubmit={handleSubmit(onEdit)}>
            <Grid container spacing={2}>
                <Grid item={true} xs={6}>
                    <FormControl fullWidth>
                        <CustomSearchable
                            title={'Industry'}
                            data={industries} clickFn={setIndustryId} value={industryId}
                        >
                            <NewIndustry/>
                        </CustomSearchable>
                    </FormControl>
                </Grid>
                <Grid item={true} xs={6} className={'form-group'}>
                    <TextField
                        className={'form-control'}
                        fullWidth
                        label="Client Name"
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                    />
                </Grid>
                <Grid item={true} xs={6} className={'form-group'}>
                    <TextField
                        className={'form-control'}
                        fullWidth
                        label="Website"
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                    />
                </Grid>
                <Grid item={true} xs={6} className={'form-group'}>
                    <TextField
                        className='form-control'
                        fullWidth
                        label="Representative"
                        value={rep}
                        onChange={e => setRep(e.target.value)}
                    />
                </Grid>
                <Grid item={true} xs={6}>
                    {agendasL ? null : (
                        <FormControl fullWidth>
                            <CustomSearchable
                                title={'Agenda'}
                                data={agendas} clickFn={setAgendas} value={agenda}>
                                <NewAgenda/>
                            </CustomSearchable>
                        </FormControl>
                    )}
                </Grid>
                <Grid item={true} xs={12}>
                    <Button type="submit" variant="contained" color="primary"
                            className="btn btn-success"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ClientEditForm;