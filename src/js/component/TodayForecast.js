import React from "react";
import { IndexLink } from "react-router";
export default class TodayForecast extends React.Component {

    render() {
        const p = this.props;
        return (
        <IndexLink to="/">
            <div id="current" class="flex-col justify-around align-center">
                <div class="location"><span class="city">{p.city}</span><span class="country-code">{p.countryCode}</span></div>
                <div id="today-temperature" class="flex-row justify-center align-center">
                    <img id="current-weather-icon" src={p.currentTempIconURL} class="weather-icon"/>
                    <div class="flex-col justify-center align-center">
                        <span class="temp min celsius">{p.minTempC}</span><sub>min</sub>
                        <span class="temp celsius">{p.currentTempC}</span>
                        <span class="temp min celsius">{p.maxTempC}</span><sub>max</sub>
                    </div>
                </div>
                <div class="title"><span title={p.currentWeatherDescription}>{p.currentWeatherTitle}</span></div>
            </div>
        </IndexLink>
        );
    }
}