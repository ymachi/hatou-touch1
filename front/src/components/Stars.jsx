const Stars = ({ rating, setRating, readOnly }) => {
    const handleClick = (newRating) => {
        if (!readOnly && setRating) {
            setRating(newRating);
        }
    };

    return (
        <>
            {[1, 2, 3, 4, 5].map((oneStar, i) => (
                <span 
                    key={i}
                    onClick={() => handleClick(oneStar)}
                    style={{
                        cursor: readOnly ? 'default' : 'pointer',
                        color: oneStar <= rating ? '#2C030B' : 'grey',
                        fontSize: '32px'
                    }}
                >
                    ★ 
                </span>
            ))}
        </>
    );
};

export default Stars;
