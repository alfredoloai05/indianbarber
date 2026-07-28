# Levantar el proyecto localmente

```powershell
cd D:\Proyectos\Indian
git fetch origin
git switch feature/initial-frontend
npm install
npm run dev
```

Abrir:

```text
http://localhost:5173
```

## Validación previa a commit

```powershell
npm run lint
npm run build
```

## Actualizar la rama local

```powershell
git pull origin feature/initial-frontend
```

## Volver a `main`

```powershell
git switch main
git pull origin main
```
