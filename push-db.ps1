Get-Content .env.local | ForEach-Object {
    if ($_ -match "^\s*([^#]+?)=(.+)$") {
        $name = $matches[1]
        $value = $matches[2]
        $env:{$name} = $value
    }
}

npx prisma db push --schema ./prisma/schema.prisma