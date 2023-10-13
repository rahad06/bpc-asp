import React from 'react';
import {Button, FormControl, Grid, TextField} from "@mui/material";
import CustomSearchable from "../CustomSearchable";
import NewIndustry from "../Industries/NewIndustry";
import NewAgenda from "../Agendas/NewAgenda";

function ClientForm(props) {
    const {industryId, setIndustryId, industries, register
    , agenda, agendas, setAgenda, handleSubmit, onEdit
    } = props;
    return (
        <div>
            <div className="panel with-scroll animated zoomIn">
                <div className="panel-heading clearfix">
                    <h3 className="panel-title">Add Client</h3></div>
                <div className="panel-body">
                    <div 
                        className="ng-scope">
                        <form className="ng-pristine ng-valid ng-scope"  onSubmit={handleSubmit(onEdit)}>
                            <Grid container spacing={2}>
                            <Grid item={true} xs={6}>
                                <FormControl fullWidth>
                                    <CustomSearchable
                                        className={'form-control'}
                                        title={'Industry'}
                                        data={industries} clickFn={setIndustryId} value={industryId}>
                                        <NewIndustry/>
                                    </CustomSearchable>
                                </FormControl>
                            </Grid>
                            <Grid item={true} xs={6} className={'form-group'}>
                                <TextField
                                    fullWidth
                                    label="Client Name"
                                    {...register('name')}
                                    required
                                    className={'form-control'}
                                />
                            </Grid>
                            <Grid item={true} xs={6}
                                  className={'form-group'}
                            >
                                <TextField
                                    fullWidth
                                    label="Website"
                                    {...register('website')}
                                    className={'form-control'}
                                />
                            </Grid>
                            <Grid item={true} xs={6}
                                  className={'form-group'}
                            >
                                <TextField
                                    fullWidth
                                    label="Representative"
                                    {...register('representative')}
                                    className={'form-control'}
                                />
                            </Grid>
                            <Grid item={true} xs={6}
                                  className={'form-group'}
                            >
                                <FormControl fullWidth>
                                    <CustomSearchable
                                        title={'Agenda'}
                                        data={agendas} clickFn={setAgenda} value={agenda}
                                    >
                                        <NewAgenda/>
                                    </CustomSearchable>
                                </FormControl>
                            </Grid>
                            <Grid item={true} xs={12}
                                  className={'form-group'}
                            >
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

export default ClientForm;
    