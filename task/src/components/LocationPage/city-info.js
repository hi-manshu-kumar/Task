
import React, {PureComponent} from 'react';

export default class CityInfo extends PureComponent {

  render() {
    const {info} = this.props;
    const displayName = `${info.latitude}, ${info.longitude}`;

    return (
      <div>
        <div>
          {`Marker at ${displayName}`}
        </div>
        <img width={240} src={info.image}  />
      </div>
    );
  }
}