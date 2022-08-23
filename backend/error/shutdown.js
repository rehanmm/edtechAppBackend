module.exports=function shutdown(signal) {
    return (err) => {
      console.log(`${ signal }...`);
      if (err) console.error(err.stack || err);
      setTimeout(() => {
        console.log('...waited 5s, exiting.');
        process.exit(err ? 1 : 0);
      }, 5000).unref();
    };
  }