import React, {useState} from 'react';
import {RouteComponentProps} from '@reach/router';
import {gql, useQuery} from '@apollo/client';
import {
    Card,
    CardContent,
    CardMedia,
    Dialog,
    Grid,
    IconButton,
    Typography,
    Divider,
    Button,
    TextField
} from "@material-ui/core";
import {useStyles} from "../styles/card";
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import CircularUnderLoad from "../utils/loading";

export const CHARACTER_TILE_DATA = gql`
  fragment CharacterTile on Characters {
  __typename
    results {
      id
      name
      image
      location{
      name
      } 
    }
    info {
      count
      pages
      next
      prev
    }
  }
`;

export const GET_ALL_CHARACTERS = gql`
  query GetCharacterList($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
        ...CharacterTile
    }
  }
  ${CHARACTER_TILE_DATA}
`;

const useCharacterFilter = () => {
    const [filter, setFilter] = useState({
        name: undefined
    });
    const updateFilter = (value: any) => {
        setFilter({
            name: value
        })
    }

    return {
        models: {filter},
        operations: {updateFilter}
    }
};

interface CharactersProps extends RouteComponentProps {
}

const Characters: React.FC<CharactersProps> = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const {operations, models} = useCharacterFilter();
    const {
        data,
        loading,
        error,
        refetch,
        fetchMore,
    } = useQuery(GET_ALL_CHARACTERS);

    if (loading) return <CircularUnderLoad/>;
    if (error) return <div className={classes.error}>
        Something went wrong, please try again.
    </div>;
    if (!data) return <p>Not found</p>;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilterClose = () => {
        setOpen(false);
        refetch({filter: {name: ""}})

    }

    const handleClick = () => {
        refetch({filter: {name: models.filter.name}})
        handleClose()
    };

    return (
        <>
            <Typography variant={"h5"} className={classes.header}>
                Rick and Morty
                <IconButton onClick={handleClickOpen}>
                    <FilterListIcon/>
                </IconButton>
            </Typography>
            <Grid container spacing={8}>
                {data?.characters?.results.map((character: any) => (
                    <Grid item xs={12} md={6}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image={character.image}
                                title=""
                            />
                            <CardContent className={classes.content}>
                                <div>#id: <span className={classes.span}>{character.id}</span></div>
                                <div className={classes.subtitles}>
                                    <div className={classes.divMargin}>Name: <span
                                        className={classes.span}>{character.name}</span></div>
                                    <div>Location: <span className={classes.span}>{character.location.name}</span></div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item className={classes.buttonArea}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={async () => {
                            setIsLoadingMore(true);
                            await fetchMore({
                                variables: {
                                    page: data.characters.info.next
                                }
                            });
                            window.scrollTo({top: 0, behavior: 'smooth'})
                            setIsLoadingMore(false);
                        }}
                    >
                        Load More
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <Typography className={classes.dialogTitle}>
                    Name Filter
                    <IconButton onClick={handleFilterClose} className={classes.dialogIconButton}>
                        <CloseIcon/>
                    </IconButton>
                </Typography>
                <Divider/>
                <div className={classes.form}>
                    <TextField variant={'standard'} className={classes.filterInput}
                               onChange={(e) => operations.updateFilter(e.target.value)}/>
                    <Button onClick={handleClick} variant={'contained'} color={'primary'}>Filter</Button>
                </div>
            </Dialog>
        </>
    );
};

export default Characters;