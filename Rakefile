desc "build the frontend"
task :build do
  sh "bun run --cwd frontend build"
end

desc "dev server"
task dev: :build do
  sh "corolla", "-d", "tmp/tmp.sqlite3", "-s", "spec.json", "--static", "frontend/dist", "-r", "/chatty"
end
