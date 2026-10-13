<Stack direction="row" spacing={2} gap={2} sx={{ margin: '10px 0' }}>

    <TextField label="🔍 بحث" fullWidth variant="outlined" sx={{ mb: 2, direction: 'rtl' }}
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size='small' />

    <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexDirection: 'column' }}>

        {/* Select */}
        <FilterDialog onChange={handleFilterChange} width={180} />

    </Box>
    <Button size='small'
        sx={{
            bgcolor: "#2e7d32", color: "#fff", borderRadius: "30%", p: 1.3, minWidth: "48px",
            "&:hover": { bgcolor: "#1b5e20", transform: "scale(1.05)", transition: "all 0.2s ease", },
        }} onClick={refreshPatients}>
        <UpdateIcon fontSize="medium" />
    </Button>
</Stack>