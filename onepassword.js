import { exec } from "child_process";
import fs from 'fs';

export async function parseToken(tokenPath) {
    const opRead = `op read ${tokenPath}`;
    return new Promise((resolve, reject) => {
        exec(opRead, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(new Error(`1Password CLI error: ${stderr}`));
                return;
            }

            const token = stdout.trim();
            resolve(token);
        });
    });
}

export async function parseFile(file) {
  const template = fs.readFileSync(file, 'utf8');
  const opInject = `op inject`;

  return new Promise((resolve, reject) => {
    const child = exec(opInject, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(`1Password CLI error: ${stderr}`));
        return;
      }

      const data = JSON.parse(stdout);
      resolve(data);
    });

    child.stdin.write(template);
    child.stdin.end();
  });
}