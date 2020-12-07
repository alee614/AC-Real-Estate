import React, { Component } from "react";
import './Category.css';
import {withRouter} from "react-router";
import VillagerPreview from '../VillagerPreview/VillagerPreview'

class Category extends Component{

    constructor(){
        super();
        this.state = {
            clickedVillager : {},
            type : "",
            category : "",

            allvillagers : [],
        };
    }

    async componentDidMount(){
        let propstype = this.props.match.params.type;
        let propscategory = this.props.match.params.category;

        const url = `http://localhost:80/${propstype}/${propscategory}`;
        console.log(url);
        await fetch(url)
        .then (response => {
            if (!response.ok){
                throw new Error("Network response not ok.")
            }
            return response.json();
        })
        .then( data => 
            this.setState({
                allvillagers : data,
                type : propstype,
                category : propscategory,
            }))
            .catch(error => {
                console.log("There has been a problem with fetch operation:", error);
        })
        ;


    }


    render(){
        console.log(this.state.allvillagers);
        let villagerComponents = this.state.allvillagers.map( villager => {
            return(
                // console.log(villager)
                    <VillagerPreview key={villager.name} 
                                    villager={villager}
                                    />
           
            )
        }
            )

        return(
            <div className="all">
                <h1>{this.state.type} : {this.state.category}</h1>
                <div className="allresults">
                    {villagerComponents}
                    </div>
            </div>
        )
    }

}
export default withRouter(Category);
