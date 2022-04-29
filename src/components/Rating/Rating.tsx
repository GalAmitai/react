const Rating = (props: any) => {

    const { rate } = props;

    const isInt = (num: number) => Number(num) === num && num % 1 === 0;
    const floorNum = (num: number) => Math.floor(num);

    return (
        <>
            <div className="rating">
                {Array(floorNum(rate)).fill(1).map((e, i) => (
                    <img key={i} src="/img/icons/star.svg" alt="star" />
                ))}
                {!isInt(rate) ? <img src="/img/icons/half-star.svg" alt="half-star" /> : ''}
                {rate}
            </div>
        </>
    )
}

export default Rating;