import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Card, Box, CardContent, CardMedia, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/Product';
import { getWatchList } from '../../utils/watch-manager';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface IWatchListDialog {
    open: boolean,
    onClose: any;
}

const WatchListDialog = (props: IWatchListDialog) => {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState(getWatchList());

    useEffect(() => {
        setOpen(props.open)
    })

    useEffect(() => {
        setList(getWatchList())
    },[open])

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={true}
                maxWidth='md'
                onClose={props.onClose}
                aria-describedby="alert-dialog-slide-description"
                
            >
                <DialogTitle>{"Watch list"}</DialogTitle>
                <DialogContent>
                    {list.map((product: IProduct) => (
                        <List key={product.id} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: '100px', height: '100px', marginRight: '40px' }}>
                                        <img src={product.image} style={{width:'150%'}}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'$' + product.price} secondary={product.description} />
                            </ListItem>
                        </List>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Continue Shopping</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WatchListDialog;