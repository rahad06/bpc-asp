import React from 'react';

function ClientTable(props) {
    return (
        <div className="panel-body">
            <div className="ng-scope">
                <div className="vertical-scroll" style={{overflow:'auto'}}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {props.headers.map((h,i) => (
                                <th key={i}>{h.header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {props.data?.map((d, i) => (
                            <tr className="ng-scope" key={i}>
                                <td className="ng-binding table-id">{d.id}</td>
                                <td className="ng-binding">{d.name}</td>
                                <td className="ng-binding">{d.website}</td>
                                <td className="ng-binding">{d.representative}</td>
                                <td className="ng-binding">{d.industry?.name}</td>
                                <td className="ng-binding">{d.agenda?.name}</td>
                            <td><a className="email-link ng-binding"
                                   href="mailto:mdo@gmail.com">mdo@gmail.com</a></td>
                            <td className="ng-binding">28</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ClientTable;
