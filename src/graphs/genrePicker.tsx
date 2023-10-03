import React, { useEffect, useState } from 'react';
import { toTitleCase, Genres } from '../common';
import { descending } from 'd3';

interface GenreProps {
    genre: string|undefined;
    handler: React.MouseEventHandler<HTMLButtonElement>;
    label: string;
    x: number;
    genreList: Genres | null;
}

export const GenrePicker: React.FC<GenreProps> = ({
    genre, handler, label, x, genreList
}) => {
    const [genreNames, setGenreNames] =
        useState<string[]>(Object.keys(genreList));
    const [sortAsc, setSortAsc] = useState<boolean>(true);
    const [sortedPopular, setsortedPopular] = useState<boolean>(false);
    const [filteredGenres, setFilteredGenres] =
        useState(Object.entries(genreList));

    const sortAlphabet = function() {
        if (sortAsc) {
            setGenreNames(filteredGenres.map(genre => genre[0]));
        } else {
            setGenreNames(filteredGenres.map(genre => genre[0])
                .sort(descending));
        }
    };

    const handleOutClick = (
        evt:MouseEvent
    ): void => {
        const element = document.getElementById('genre' + x);
        if (element){
            if (evt.target !== element && !element.contains(evt.target as Node))
            {
                document.getElementById('genreList' + x)
                    .classList.remove('show');
            }
        }
    };

    window.addEventListener('click', handleOutClick);

    const sortPopular = function() {
        setGenreNames(Object.values(filteredGenres)
            .sort((a, b) => b[1].count - a[1].count)
            .map(genre => genre[0]));
        setsortedPopular(true);
    };

    const handleAlphabet = (
        evt: React.MouseEvent<HTMLElement>): void =>
    {
        evt.preventDefault();
        if (sortedPopular) {
            setsortedPopular(false);
            sortAlphabet();
        } else {
            setSortAsc(!sortAsc);
        }
    };

    const handlePopular = (
        evt: React.MouseEvent<HTMLElement>): void =>
    {
        evt.preventDefault();
        sortPopular();
    };

    const filterSearch = function(
        evt: React.ChangeEvent<HTMLInputElement>): void {
        setFilteredGenres(Object.entries(genreList)
            .filter((genre) => genre[0]
                .includes(evt.target.value.toLowerCase().replace(' ', '_'))));
    };

    const generateListItem = function(
        item:string,
        genreNumber:number,
        index:number,
        handler:React.MouseEventHandler<HTMLButtonElement>
    ) {
        return (
            <li key={index}
                className={`list-group-item bg-dark text-white 
                    hover-green p-0 ${(item === genre ? 'active': '')}`}
            >
                <button
                    className='btn w-100'
                    data-cy={'Option' + genreNumber + '-' + index}
                    onClick={handler}
                    value={item}
                >
                    {toTitleCase(item)}
                </button>
            </li>
        );
    };

    /* eslint-disable max-len */
    const displaySortDirection = function() {
        if (sortAsc) {
            return (<>
                A-Z
                <span className='mx-2'></span>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-down-circle' viewBox='0 0 16 16'>
                    <path fillRule='evenodd' d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z'/>
                </svg>
            </>);
        } else {
            return (<>
                Z-A
                <span className='mx-2'></span>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-up-circle' viewBox='0 0 16 16'>
                    <path fillRule='evenodd' d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'/>
                </svg>
            </>);
        }
    };
    /* eslint-enable max-len */

    useEffect(() => {
        if (sortedPopular) {
            sortPopular();
        } else {
            sortAlphabet();
        }
    }, [filteredGenres]);

    useEffect(() => {
        sortAlphabet();
    }, [sortAsc]);

    return (
        <div className='mb-3' id={'genre' + x}>
            <label htmlFor={label + 'Genre'}
                className='form-label col-12'
            >
                {'Genre ' + x}
            </label>
            <button
                id={label + 'Genre'}
                className='btn btn-dark
                    text-white hover-green'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target={'#genreList' + x}
                data-cy={label + 'Genre'}
                aria-expanded='false'
                aria-controls={'genreList' + x}
            >
                {genre ?
                    toTitleCase(genre) :'Select One'}
            </button>
            <div
                className='collapse p-2'
                id={'genreList' + x}
            >
                <div
                    className='row mb-2'
                    aria-label='Sorting options'
                >
                    <button
                        className='btn text-white col'
                        onClick={handleAlphabet}
                    >
                        {displaySortDirection()}
                    </button>
                    <button
                        className='btn text-white col'
                        onClick={handlePopular}
                        disabled={sortedPopular}
                    >
                        Popularity
                    </button>
                </div>
                <input
                    className='form-control'
                    onChange={filterSearch}
                    placeholder='Search'
                    type='text' />
                <hr />
                <ul
                    className='list-group'
                    style={{
                        height: '35rem',
                        overflowX: 'clip',
                        overflowY: 'scroll',
                    }}
                >
                    {genreNames.map((genre, index) =>
                        generateListItem(
                            genre,
                            x,
                            index,
                            handler
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};