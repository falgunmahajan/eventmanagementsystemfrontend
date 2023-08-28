import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CardComponent = (props) => {
  let width=props.width
  return (
    <div>
       <Card sx={{width:{width}, mb:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.imgSrc}
          alt="green iguana" 
          
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center"}}>
            {props.title}
          </Typography>
          <Typography variant="body1" sx={{textAlign:"center"}}>
            {props.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  )
}

export default CardComponent
