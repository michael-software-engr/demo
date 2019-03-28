namespace :tools do # rubocop:disable Metrics/BlockLength
  desc '...'
  task deploy: :environment do
    deploy_dir = container_dir 'deploy'
    FileUtils.rm_r deploy_dir if File.exist? deploy_dir

    FileUtils.cp_r Rails.root, deploy_dir

    deploy_dir_git = File.join deploy_dir, '.git'
    FileUtils.rm_r deploy_dir_git if File.exist? deploy_dir_git

    Dir.chdir deploy_dir
    gh_repo = 'gh'
    [
      %w[git init],
      %w[git add .],
      ['git', 'commit', '-m', 'Commit init.'],
      %w[heroku git:remote -a stocks-and-options],
      %w[git push --force heroku master],
      %w[heroku run rake db:import],
      [%w[git remote add], gh_repo, %w[git@github.com:michael-software-engr/demo.git]],
      [%w[git push --force --set-upstream], gh_repo, %w[master]]
    ].each do |cmd|
      system(*cmd.flatten) || exit
    end
  end

  private

  def container_dir(*join_these)
    dir = File.dirname Rails.root

    return dir if join_these.blank?

    return File.join(dir, *join_these)
  end
end
