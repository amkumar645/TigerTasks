import { Chip } from "@mui/material";

const CategoryChip = ({category}) => {

    return (
        <>
            {category === 'Art' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway', 
                backgroundColor:"#e91e63", color: 'white'}}/>}
            {category === 'Food' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway',
                backgroundColor:"#ff5722", color: 'white'}}/>}
            {category === 'Tech' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway',
                backgroundColor:"#009688", color: 'white'}}/>}
            {category === 'Shopping' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway',
                backgroundColor:"#2196f3", color: 'white'}}/>}
            {category === 'Transportation' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway',
                backgroundColor:"#3f51b5", color: 'white'}}/>}
            {category === 'Activity' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway',
                backgroundColor:"#9c27b0", color: 'white'}}/>}
            {category === 'Tutoring' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway',
                backgroundColor:"#b2a429", color: 'white'}}/>}
            {category === 'Other' && 
                <Chip label={category} sx={{ mb: 1, fontSize: '16px', fontFamily: 'Raleway',
                backgroundColor:"darkgrey", color: 'white'}}/>}
        </>
    );

}

export default CategoryChip;