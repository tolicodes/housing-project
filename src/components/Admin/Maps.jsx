{ neighborhoods.map(hood => (
  <div key={hood}>
    <Map
      className={classes.map}
      zoomControl={false}
      scrollWheelZoom={false}
      touchZoom={false}
      doubleClickZoom={false}

      zoom={ZOOM}
      center={getCenter(city, hood)}
    >
      <TitleLayer />

      <GeoJSON
        data={{
          type: 'FeatureCollection',
          features: MAPS[city].features.filter(({ properties: { name } }) => name === hood),
        }}
      />
    </Map>
    {hood}
  </div>
)); }
