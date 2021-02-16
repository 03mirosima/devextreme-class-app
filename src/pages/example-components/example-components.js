import React from 'react';
import ImageSlider from '../../components/gallery/gallery';
import NavBarExample from '../../components/navbar/navbar';
import { navigation } from "../../components/navbar/navigation";
import './example-components.scss';

export default (props) => (
  <React.Fragment>
    <h2 className={'content-block'}>Example Components</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <h3 className="text-center">Slider</h3>
        <ImageSlider />
      <h3>Navbar</h3>
      <NavBarExample {...props} />
      </div>
    </div>
  </React.Fragment>
);
