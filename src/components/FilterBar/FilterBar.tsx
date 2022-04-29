import { Box, makeStyles, Rating, Slider } from "@mui/material";
import { useState } from "react";
import './FilterBar.css';
import { useObserver } from "mobx-react-lite";
import { useRootStore } from "../../store/RootStateContext";

const FilterBar = (props: any) => {

    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
    const [reviewFilter, setReviewFilter] = useState<number | null>(1.5);
    const marks = [{ value: 0, label: '0$', }, { value: 2000, label: '2000$', }];
    const { productsStore } = useRootStore();

    const handleChangePrice = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    const handleChangeCommitted = (event: any, newValue: number | number[]) => {
        productsStore.setPriceRange(newValue);

    }

    return useObserver(() => (
        <>
            <div className="filter">
                <div className="title">Price Range Selected</div>
                <Box sx={{ width: '90%', padding: '0 10px', marginTop: '10px' }}>
                    <Slider
                        value={priceRange}
                        onChange={handleChangePrice}
                        onChangeCommitted={handleChangeCommitted}
                        disableSwap
                        step={100}
                        marks={marks}
                        min={0}
                        max={2000}
                        valueLabelDisplay="auto"
                    />
                </Box>
            </div>

            <div className="filter">
                <div className="title">Customers Reviews</div>
                <Box
                    sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Rating
                        name="text-feedback"
                        precision={0.5}
                        value={reviewFilter}
                        onChange={(event, newValue) => {
                            setReviewFilter(newValue);
                            productsStore.setReviewFilter(newValue);
                        }}
                    />
                    <Box sx={{ ml: 2 }}>& Up</Box>
                </Box>
            </div>
        </>
    ));
}

export default FilterBar;