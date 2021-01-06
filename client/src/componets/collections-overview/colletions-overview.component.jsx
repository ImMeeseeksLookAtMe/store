import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collections-overview.styles.scss';

import PreviewCollection from '../preview-collection/preview-collection.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const CollectionOverview = ({ collections }) => {
    return (
        <div className='collections-overview'>
            {
                collections.map(({id, ...otherCollectionsProps}) => (
                    <PreviewCollection key={id} {...otherCollectionsProps}/>
                ))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});


export default connect(mapStateToProps)(CollectionOverview);
