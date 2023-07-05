import React, {Component} from 'react';
import HomeCardHolder from "./Home/HomeCardHolder";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <>
          <HomeCardHolder/>
            </>
        );
    }
}
