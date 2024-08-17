// pb_migrations/1687801090_initial_settings.js
migrate((db) => {
  const dao = new Dao(db);

  const settings = dao.findSettings();
  settings.meta.appName = "Restorant Management System";
  settings.logs.maxDays = 2;

  dao.saveSettings(settings);
});
