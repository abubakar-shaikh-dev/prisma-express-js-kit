import compression from "compression";

const apiCompression = compression({
    level: 7,
    threshold: 0,
    filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
            return false;
        }

        return compression.filter(req, res);
    },
});

export default apiCompression;
