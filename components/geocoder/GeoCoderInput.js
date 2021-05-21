import React, { useState, useMemo } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import throttle from "lodash/throttle";

Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");
Geocode.enableDebug();

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  box: {
    background: "white",
    width: "200px"
  },
  map: {
    marginTop: "25px",
    width: "200px",
    height: "300px",
  },
  textInput: {
    marginTop: "16px",
  },
}));

function GeoCoderInput({
  onChange,
  google,
  hasError,
  address,
  location,
  ...rest
}) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [center, setCenter] = useState(null);
  const [position, setPosition] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetch = useMemo(
    () =>
      throttle((request) => {
        Geocode.fromAddress(request).then(
          (response) => {
            let newOptions = [];

            if (value) {
              newOptions = [value];
            }

            if (response.results) {
              newOptions = [...response.results];
            }

            setOptions(newOptions);
          },
          (error) => {
            setOptions([]);
          }
        );
      }, 200),
    [inputValue]
  );

  const fetchFromUpdate = (lat, lng) => {
    console.log(lat, lng);
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        setOptions(response.results);
        setValue(response.results[0]);
        setInputValue(response.results[0].formatted_address);
        // setCenter(response.results[0].geometry.location);
        setPosition(response.results[0].geometry.location);
        if (onChange) {
          onChange(
            response.results[0].formatted_address,
            response.results[0].geometry.location
          );
        }
      },
      (error) => {
        setOptions([]);
      }
    );
  };

  const updateInitialLocation = (address) => {
    Geocode.fromAddress(address).then(
      (response) => {
        setOptions(response.results);
        setValue(response.results[0]);
        setInputValue(response.results[0].formatted_address);
        setCenter(response.results[0].geometry.location);
        setPosition(response.results[0].geometry.location);
        setLoaded(true);
      },
      (error) => {
        setOptions([]);
        setLoaded(true);
      }
    );
  };

  React.useEffect(() => {
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch(inputValue);
    if (!loaded && address) {
      updateInitialLocation(address);
    }
  }, [value, inputValue, fetch]);

  const onClickMap = (mapProps, map, e) => {
    fetchFromUpdate(e.latLng.lat(), e.latLng.lng());
  };

  return (
    <Box position="relative" className={classes.box}>
      <Autocomplete
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.formatted_address
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        fullWidth
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          if (newValue && newValue.geometry) {
            setCenter(newValue.geometry.location);
            setPosition(newValue.geometry.location);
            if (onChange) {
              onChange(newValue.formatted_address, newValue.geometry.location);
            }

            const viewport = newValue.geometry.viewport;
            if (viewport) {
              setBounds({
                east: viewport.northeast.lng,
                north: viewport.northeast.lat,
                south: viewport.southwest.lat,
                west: viewport.southwest.lng,
              });
            }
          } else {
            onChange(null, null);
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={hasError}
            className={classes.textInput}
            label="Address"
            variant="outlined"
            fullWidth
          />
        )}
        renderOption={(option) => {
          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  {option.formatted_address}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
      {/* <Map
        className={classes.map}
        google={google}
        center={center}
        bounds={bounds}
        style={{ height: "300px", position: "relative", width: "100%" }}
        zoom={14}
        onClick={onClickMap}
      >
        {position && <Marker position={position} />}
      </Map> */}
    </Box>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API_KEY,
})(GeoCoderInput);
