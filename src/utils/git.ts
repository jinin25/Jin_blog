import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

/**
 * Git历史记录项
 */
export interface GitHistoryItem {
	date: Date;
	type: "create" | "modify";
	hash: string;
}

/**
 * 获取文件的Git历史记录
 * @param filePath 文件路径
 * @returns Git历史记录数组
 */
export function getFileGitHistory(filePath: string): GitHistoryItem[] {
	if (!existsSync(filePath)) {
		return [];
	}

	try {
		// 获取文件的所有commit历史
		const result = execSync(`git log --follow --format=%H|%aI -- "${filePath}"`, { encoding: "utf-8", cwd: path.dirname(filePath) }).trim();

		if (!result) {
			return [];
		}

		const commits = result.split("\n").map(line => {
			const [hash, dateStr] = line.split("|");
			return { hash, date: new Date(dateStr) };
		});

		if (commits.length === 0) {
			return [];
		}

		// 最早的commit是创建，其他都是修改
		const history: GitHistoryItem[] = [];

		// 最后一个是最早的commit（创建）
		if (commits.length > 0) {
			history.push({
				date: commits[commits.length - 1].date,
				type: "create",
				hash: commits[commits.length - 1].hash
			});
		}

		// 其他commit都是修改
		for (let i = commits.length - 2; i >= 0; i--) {
			history.push({
				date: commits[i].date,
				type: "modify",
				hash: commits[i].hash
			});
		}

		return history;
	} catch (error) {
		console.error(`获取Git历史失败: ${filePath}`, error);
		return [];
	}
}

/**
 * 获取文件的最后修改日期
 * @param filePath 文件路径
 * @returns 最后修改日期，如果没有Git历史则返回null
 */
export function getLastModifiedDate(filePath: string): Date | null {
	const history = getFileGitHistory(filePath);
	return history.length > 0 ? history[0].date : null;
}
