import { Spinner } from 'flowbite-react';
import React from 'react';

const LoadingSpinner = () => {
    return (
        <Spinner
            color="failure"
            aria-label="Center-aligned  Failure spinner example" size="xl"
        />
    );
};

export default LoadingSpinner;