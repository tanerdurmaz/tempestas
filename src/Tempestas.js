import React from 'react';
import './Tempestas.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
/**
"main":"Clouds",
"description":"scattered clouds",
"icon":"03d",
"temp":284.58,
"name":"London",
 */

class Tempestas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            locationFound: false,
            description: '',
            icon: '',
            temp: '',
            city: '',
            celsius: 0,
            fahrenheit: 0,
            isMetric: false
        };
        this.success = this.success.bind(this);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("success " + latitude);
        console.log("success " + longitude);

        this.setState({ latitude: latitude, longitude: longitude, locationFound: true });

        console.log("state lat" + this.state.latitude);
        console.log("state lon" + this.state.longitude)
        this.fetchWeather();
    }
    error() {
        console.log("error ");
    }

    fetchWeather() {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&APPID=ddec653e83e40ed4e33db40864945140`)
            .then(res => {
                this.setState({
                    description: res.data.weather[0].description,
                    icon: res.data.weather[0].icon,
                    temp: res.data.main.temp,
                    city: res.data.name,
                    celsius: Math.round(parseFloat(res.data.main.temp) - 273.15),
                    fahrenheit: Math.round((parseFloat(res.data.main.temp) - 273.15) * 1.8) + 32
                });
                console.log("description " + this.state.description);
                console.log("icon " + this.state.icon);
                console.log("temp " + this.state.temp);
                console.log("city " + this.state.city);
                console.log("celsius " + this.state.celsius);
                console.log("fahrenheit " + this.state.fahrenheit);
            })
    }


    componentDidMount() {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success, this.error);
        }

    }

    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        this.setState({ isMetric: !this.state.isMetric });
    }

    render() {
        return (
            <div>
                <div> {this.state.description} </div>
                <div className="container">
                    <div className="degree">
                        <Box color="white" bgcolor="#0F5046">
                            {this.state.isMetric && this.state.celsius}   {this.state.isMetric && <a>&#186; c</a>} 
                            {!this.state.isMetric && this.state.fahrenheit}   {!this.state.isMetric && <a>&#186; F</a>} 
                        </Box>
                    </div>
                    <div className="icon">
                        <Box color="white" bgcolor="#CDDAD9">
                            <img src="http://openweathermap.org/img/wn/10d@2x.png" />
                        </Box>
                    </div>
                    <div className="description">
                        <Box color="white" bgcolor="#0F5046">
                            {this.state.description}
                        </Box>
                    </div>
                    <div className="city">
                        <Box color="white" bgcolor="#0F5046">
                            {this.state.city}
                        </Box>
                    </div>
                    <div className="button" >
                        <Box color="white" bgcolor="#0F5046">
                            <Button style={{ maxWidth: '30vh', maxHeight: '10vh', minWidth: '30vh', minHeight: '10vh', fontSize: 24, color: 'white' }} onClick={this.handleClick}>
                                C/F
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        )
    }
}
export default Tempestas;
