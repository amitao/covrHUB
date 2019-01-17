import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { connect } from 'react-redux';


const style={
  height: "15em",
  width:"25em",
}



class Chart extends React.Component {
  render () {
 
// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
return (
  <div style={style}>
    <ResponsivePie
        data={this.props.chartValue}
          
        margin={{
            "top": 0,
            "right": 0,
            "bottom": 40,
            "left": 40
        }}
        innerRadius={0.4}
        padAngle={2}
        cornerRadius={3}
        colors="nivo"
        colorBy="id"
        borderWidth={1}
        borderColor="#c0c4ea"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        // radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "#e1e3f7",
                "color": "#880E62",
                "size": 5,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "#cafaef",
                "color": "#0ae3ad",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[

            {
                "match": {
                    "id": "Paid"
                },
                "id": "lines"
            },

            {
                "match": {
                    "id": "Total"
                },
                "id": "dots"
            }
        ]}

        legends={[
            {
                "anchor": "bottom",
                "direction": "row",
                "translateY": 56,
                "itemWidth": 100,
                "itemHeight": 18,
                "itemTextColor": "#999",
                "symbolSize": 18,
                "symbolShape": "circle",
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemTextColor": "#000"
                        }
                    }
                ]
            }
        ]}
    />
</div>)

}
 
}

const mapStateToProps = (reduxState) => {
    return {
      reduxState
    }
  } 


export default connect(mapStateToProps)(Chart);