import React from 'react';

interface PreviewProps {
    screenshot: string[];
    setScreenshot: React.Dispatch<React.SetStateAction<string[]>>
}

export const ImagePreview: React.FC<PreviewProps> = (
    {screenshot, setScreenshot}
) => {
    const removeImage:React.MouseEventHandler<HTMLButtonElement> =
        function(e) {
            const index =
                Number.parseInt((e.target as HTMLButtonElement).value);
            setScreenshot(screenshot.filter((_, i) => i !== index));
        };

    return (
        <div className='row'>
            {screenshot.map((image, key) => (
                <div key={key} className='col'>
                    <div className='card my-2'>
                        <button value={key}
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                height: '2.2rem',
                                width: '2.5rem'
                            }}
                            className='btn btn-danger float-end col-1 m-1'
                            onClick={removeImage}
                        >
                            X
                        </button>
                        <img src={image} alt={'Graph preview ' + (key + 1)} />
                    </div>
                </div>
            ))}
        </div>
    );
};